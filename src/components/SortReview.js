import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {observer} from 'mobx-react-lite';
import { Context } from '../index';
import { useParams } from 'react-router-dom';
import {GROUPS} from '../utils/consts';
import {personalReviews} from '../http/reviewAPI';
import { useTranslation } from 'react-i18next';
import Col from 'react-bootstrap/Col';

const SortReview = observer(() => {
  const { t, i18n } = useTranslation();
  const {review} = useContext(Context)
  const {id} = useParams();
  const [group, setGroup] = useState();
  const [date, setDate] = useState();
  const [grade, setGrade] = useState();
  const [inputGroup, setInputGroup] = useState();
  const [inputDate, setInputDate] = useState();
  const [inputGrade, setInputGrade] = useState();
  const SORT = ['asc', 'desc'];

  useEffect(() => {
    personalReviews(id, group, date, grade).then(data => review.setPersonalReview(data))
  },[group, date, grade])

  return (
    <Col className="d-flex justify-content-between flex-wrap">
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={GROUPS}
      sx={{ width: 300 }}
      onChange={(event, newValue) => setGroup(newValue)}
      inputValue={inputGroup}
          onInputChange={(event, newInputValue) => {
            setInputGroup(newInputValue);
          }}
      renderInput={(params) => <TextField {...params} label={t("personal.sortGroup")} />}
    />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={SORT}
      sx={{ width: 300 }}
      onChange={(event, newValue) => setDate(newValue)}
      inputValue={inputDate}
          onInputChange={(event, newInputValue) => {
            setInputDate(newInputValue);
          }}
      renderInput={(params) => <TextField {...params} label={t("personal.date")} />}
    />
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={SORT}
      sx={{ width: 300 }}
      onChange={(event, newValue) => setGrade(newValue)}
      inputValue={inputDate}
          onInputChange={(event, newInputValue) => {
            setInputGrade(newInputValue);
          }}
      renderInput={(params) => <TextField {...params} label={t("personal.sortGrade")} />}
    />
  </Col>
  )
})

export default SortReview

