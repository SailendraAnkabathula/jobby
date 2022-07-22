import './index.css'
import {BsSearch} from 'react-icons/bs'

const SearchInput = props => {
  const {onEnterKeyPressed, searchInputText, onChangeSearchInput} = props
  const onChangeSearchInputText = event => {
    onChangeSearchInput(event.target.value)
  }
  const onKeyDownPressed = event => {
    if (event.key === 'Enter') {
      onEnterKeyPressed()
    }
  }

  const onSearchButtonClicked = () => {
    onEnterKeyPressed()
  }

  return (
    <div className="search-input-container">
      <input
        type="search"
        onChange={onChangeSearchInputText}
        value={searchInputText}
        placeholder="Search"
        onKeyDown={onKeyDownPressed}
        className="user-search-input"
      />
      <button
        type="button"
        testid="searchButton"
        onClick={onSearchButtonClicked}
        className="search-button"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}
export default SearchInput
