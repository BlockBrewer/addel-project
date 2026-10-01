import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Button, Container, Heading, Text, toast } from "@medusajs/ui"
import { useCallback, useEffect, useRef, useState } from "react"

type Media = { id: string; filename: string | null; mimeType: string; type: string }
type DigitalProduct = { id: string; name: string; medias: Media[] } | null

// Shown on the variant page: attach the downloadable file(s) a customer
// receives after buying this variant.
const DigitalProductFiles = ({ data }: { data: { id: string; title?: string } }) => {
  const [digital, setDigital] = useState<DigitalProduct>(null)
  const [busy, setBusy] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    const res = await fetch(`/admin/digital-products?variant_id=${data.id}`, {
      credentials: "include",
    })
    if (res.ok) setDigital((await res.json()).digital_product)
  }, [data.id])

  useEffect(() => {
    load()
  }, [load])

  const upload = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    try {
      const form = new FormData()
      Array.from(files).forEach((f) => form.append("files", f))
      const up = await fetch("/admin/uploads", { method: "POST", credentials: "include", body: form })
      if (!up.ok) throw new Error("Upload failed")
      const { files: uploaded } = await up.json()

      const medias = uploaded.map((u: { id: string }, i: number) => ({
        file_id: u.id,
        filename: files[i].name,
        mime_type: files[i].type || "application/octet-stream",
        type: "main",
      }))

      // A variant has one digital product; replace it with the new set of files.
      if (digital) {
        await fetch(`/admin/digital-products/${digital.id}`, { method: "DELETE", credentials: "include" })
      }
      const res = await fetch("/admin/digital-products", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.title || "Digital product", variant_id: data.id, medias }),
      })
      if (!res.ok) throw new Error("Could not save digital product")
      toast.success("Digital files saved")
      await load()
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ""
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Digital files</Heading>
        <Button size="small" variant="secondary" isLoading={busy} onClick={() => input.current?.click()}>
          {digital ? "Replace files" : "Upload files"}
        </Button>
        <input ref={input} type="file" multiple hidden onChange={(e) => upload(e.target.files)} />
      </div>
      <div className="px-6 py-4">
        {digital?.medias?.length ? (
          <ul className="flex flex-col gap-1">
            {digital.medias.map((m) => (
              <li key={m.id}>
                <Text size="small">{m.filename ?? m.id}</Text>
              </li>
            ))}
          </ul>
        ) : (
          <Text size="small" className="text-ui-fg-subtle">
            No files attached. Customers who buy this variant will receive the uploaded files as downloads.
          </Text>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product_variant.details.after",
})

export default DigitalProductFiles
