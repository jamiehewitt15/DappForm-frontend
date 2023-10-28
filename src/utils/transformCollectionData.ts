export interface InputObj {
  id: string
  collectionName: string
  contract: string
  retired: boolean
  collectionInfoFields: string[]
  collectionInfoValues: string[]
}

export interface OutputObj {
  id: string
  collectionName: string
  contract: string
  retired: boolean
  [key: string]: string | boolean
}

export function collectionTransformJson(jsonArray: InputObj[]): OutputObj[] {
  return jsonArray.map((item) => {
    const outputObj: OutputObj = {
      id: item.id,
      collectionName: item.collectionName,
      contract: item.contract,
      retired: item.retired
    }

    item.collectionInfoFields.forEach((field, index) => {
      outputObj[field] = item.collectionInfoValues[index]
    })

    return outputObj
  })
}
