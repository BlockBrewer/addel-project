import { Label, RadioGroup, Text, clx } from "@modules/common/components/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua-dark">
        {title}
      </Text>
      <RadioGroup data-testid={dataTestId} className="flex flex-col gap-y-2">
        {items?.map((i) => {
          const active = i.value === value
          return (
            <div key={i.value} className="flex items-center gap-x-2">
              <span
                className={clx(
                  "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                  active ? "bg-aqua" : "bg-aqua-navy/15"
                )}
              />
              <RadioGroup.Item
                checked={active}
                onChange={() => handleChange(i.value)}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "!txt-compact-small !transform-none cursor-pointer transition-colors hover:text-aqua-navy",
                  active ? "font-medium text-aqua-navy" : "text-aqua-navy/60"
                )}
                data-testid="radio-label"
                data-active={active}
              >
                {i.label}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
