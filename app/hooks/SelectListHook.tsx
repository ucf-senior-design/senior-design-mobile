import React, { useState } from "react"

/**
 * Creates a Hook to be used with a Select List
 * @param {Array<string>} options Array of string values to be in the select list
 * @param {Array<string>} [initSelected] Array of string values to initilize as selected
 */
export interface valuesHookProps {
  initSelected?: Array<string>
  options: Array<string>
}

export interface SelectListHook {
  values: values
  addOption: () => void
  updateSelected: (option: string) => void
  isSelected: (option: string) => boolean
  togglePopUp: () => void
  updateOptionInput: (option: string) => void
}

interface values {
  optionInput: string
  isPopUpVisible: boolean
  selected: Set<string>
  options: Array<string>
}
export function SelectListHook(props: valuesHookProps): SelectListHook {
  const [values, setValues] = useState<values>({
    optionInput: "",
    isPopUpVisible: false,
    selected: new Set(props.initSelected) ?? new Set(),
    options: props.options,
  })

  function isSelected(option: string): boolean {
    return selected.has(option)
  }

  function updateOptionInput(option: string) {
    setValues((values) => ({
      ...values,
      optionInput: option,
    }))
  }
  function addOption() {
    if (values.optionInput.length === 0) {
      setValues((values) => ({
        ...values,
        isPopUpVisible: false,
      }))
      return
    }

    let nSelect = values.selected
    let nOptions = values.options

    nSelect.add(values.optionInput)
    nOptions.push(values.optionInput)

    setValues({
      optionInput: "",
      isPopUpVisible: false,
      selected: nSelect,
      options: nOptions,
    })
  }

  function updateSelected(option: string) {
    let nSelect = values.selected
    if (isSelected(option)) {
      nSelect.delete(option)
    } else {
      nSelect.add(option)
    }

    setValues((values) => ({
      ...values,
      selected: nSelect,
    }))
  }

  function togglePopUp() {
    setValues((values) => ({
      ...values,
      isPopUpVisible: !values.isPopUpVisible,
    }))
  }
  const selected = values.selected
  const options = values.options

  return { values, addOption, updateSelected, isSelected, togglePopUp, updateOptionInput }
}
