import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const categoryOptions = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Back Issues',
    value: 'back Issue'
  },
  {
    label: 'Trades',
    value: 'trade'
  },
  {
    label: 'New Comics',
    value: 'new comic'
  }
]
const SearchBox = ({history, keyword: keywordInitialValue, category: categoryIntialValue}) => {
  const [keyword, setKeyword] = useState(keywordInitialValue)
  const [category, setCategory] = useState(categoryIntialValue)

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim() || category) {
      history.push(`/search/${keyword}?category=${category || ''}`)
    } else {
      history.push('/comics')
    }
  }

  const onSelectChange = (e) => {
    console.log('on select change', e)
    setCategory(e.target.value)
  }

  return (
    <Form onSubmit={submitHandler} inline >
      <Form.Control type='text' name='q' value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search Comics'
      className='mr-sm-2 ml-sm-5'>
      </Form.Control>
      <Form.Control as="select" custom value={category} onChange={onSelectChange}>
        {categoryOptions.map(({label, value}) => {
          return (
            <option key={label} value={value}>{label}</option>
          )
        })}
      </Form.Control>
      <Button type='submit' variant='outline-white' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
