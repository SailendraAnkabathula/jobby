import './index.css'
import Profile from '../Profile'

const FiltersSection = props => {
  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return (
      <ul className="salary-list">
        {salaryRangesList.map(eachRangeItem => {
          const {onChangeActiveSalaryRangeId, activeSalaryRangeId} = props
          const onClickedRadioButton = () => {
            onChangeActiveSalaryRangeId(eachRangeItem.salaryRangeId)
          }
          const isChecked = activeSalaryRangeId === eachRangeItem.salaryRangeId
          return (
            <li className="salary-item" key={eachRangeItem.salaryRangeId}>
              <input
                type="radio"
                checked={isChecked}
                onChange={onClickedRadioButton}
                id={eachRangeItem.salaryRangeId}
              />
              <label
                htmlFor={eachRangeItem.salaryRangeId}
                className="type-text"
              >
                {eachRangeItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderSalaryRangeSection = () => (
    <>
      <h1 className="employment-title">Salary Range</h1>
      {renderSalaryRangeList()}
    </>
  )

  const renderEmploymentTypesList = () => {
    const {employmentTypesList} = props
    return (
      <ul className="employment-types-list">
        {employmentTypesList.map(eachEmploymentType => {
          const {onAddEmploymentType, employmentTypes} = props
          const onClickNewType = () => {
            onAddEmploymentType(eachEmploymentType.employmentTypeId)
          }
          const isIncludes = employmentTypes.includes(
            eachEmploymentType.employmentTypeId,
          )

          return (
            <li className="type-item" key={eachEmploymentType.employmentTypeId}>
              <input
                type="checkBox"
                className="check-box"
                onChange={onClickNewType}
                checked={isIncludes}
                id={eachEmploymentType.employmentTypeId}
              />
              <label
                htmlFor={eachEmploymentType.employmentTypeId}
                className="type-text"
              >
                {eachEmploymentType.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderEmploymentSection = () => (
    <>
      <h1 className="employment-title">Type of Employment</h1>
      {renderEmploymentTypesList()}
    </>
  )

  return (
    <div className="filters-container">
      <Profile />
      <hr className="filters-hr-line" />
      {renderEmploymentSection()}
      <hr className="filters-hr-line" />
      {renderSalaryRangeSection()}
    </div>
  )
}
export default FiltersSection
