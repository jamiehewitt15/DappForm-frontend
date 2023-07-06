export interface InputObj {
  id: string
  collectionName: string
  contract: string
  retired: boolean
  collectionInfoFields: string[]
  collectionInfoValues: string[]
}

export interface OutputObj
  extends Omit<InputObj, 'collectionInfoFields' | 'collectionInfoValues'> {
  collectionInfo: { [key: string]: string }
}

export function transformJson(jsonArray: InputObj[]): OutputObj[] {
  console.log('jsonArray', jsonArray)
  return jsonArray.map((item) => {
    console.log('item', item)
    let collectionInfo: { [key: string]: string } = {}
    item.collectionInfoFields.forEach((field, index) => {
      collectionInfo[field] = item.collectionInfoValues[index]
    })
    const { collectionInfoFields, collectionInfoValues, ...rest } = item
    return { ...rest, collectionInfo }
  })
}
