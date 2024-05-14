import { ReactElement } from 'react'

import Questions from './Questions'
import ResponseFormHeading from './ResponseFormHeading'

export default function Form(): ReactElement {
  return (
    <>
      <ResponseFormHeading />
      <Questions />
    </>
  )
}
