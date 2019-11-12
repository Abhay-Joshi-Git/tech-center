import { all, fork } from 'redux-saga/effects';
import { takeAuthStateSet } from '../services/authentication/saga'
import { takeLogin } from '../pages/login/_store/saga'

export default function* root() {
  yield all([fork(takeLogin), fork(takeAuthStateSet)])
}
