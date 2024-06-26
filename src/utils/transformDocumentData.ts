import { ReactElement } from 'react'

export interface DocInputObj {
  id: string
  contract: string
  retired: boolean
  fieldNames: string[]
  fieldValues: string[]
}

export interface DocOutputObj {
  id: string
  contract: string
  retired: boolean
  [key: string]: string | boolean
}

export interface DocumentGridColumns {
  field: string
  headerName: string
  width: number
  hide?: boolean
  hideable?: boolean
  renderCell?: (params: any) => ReactElement
}

export function docTransformJson(jsonArray: DocInputObj[]): DocOutputObj[] {
  return jsonArray.map((item) => {
    const outputObj: DocOutputObj = {
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
  fieldNames: string[],
  actionColumn?: DocumentGridColumns
): DocumentGridColumns[] {
  fieldNames.forEach((fieldName) => {
    columns.push({ field: fieldName, headerName: fieldName, width: 150 })
  })
  if (actionColumn) {
    columns.push(actionColumn)
  }
  return columns
}
