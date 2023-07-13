export interface InputObj {
  id: string
  contract: string
  retired: boolean
  fieldNames: string[]
  fieldValues: string[]
}

export interface OutputObj {
  id: string
  contract: string
  retired: boolean
  [key: string]: string | boolean
}

export interface DocumentGridColumns {
  field: string
  headerName: string
  width: number
}

export function transformJson(jsonArray: InputObj[]): OutputObj[] {
  return jsonArray.map((item) => {
    let outputObj: OutputObj = {
      id: item.id,
      contract: item.contract,
      retired: item.retired
    }

    item.fieldNames.forEach((field, index) => {
      outputObj[field] = item.fieldValues[index]
    })

    return outputObj
  })
}

export function transformColumns(
  columns: DocumentGridColumns[],
  fieldNames: string[]
): DocumentGridColumns[] {
  fieldNames.forEach((fieldName) => {
    columns.push({ field: fieldName, headerName: fieldName, width: 150 })
  })
  return columns
}
