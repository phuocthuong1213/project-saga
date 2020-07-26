import { fork, take, call, put, delay, takeLatest, select } from 'redux-saga/effects'
import * as taskTypes from '../constants/task';
import { getListTask } from '../apis/task';
import { STATUS_CODE } from '../constants/index';
import { fetchListTaskSuccess, fetchListTaskFailed, filterTaskSuccess } from '../action/task';
import { showLoading, hideLoading } from '../action/ui';

//takeEvery
/**
 * B1: Thực thi action fetch task
 * B2: Gọi API
 *  - 2.1: Hiển thị thanh tiến trình (loading)
 * B3: Kiểm tra status code
 * * Nếu thành công ...
 * * Nếu thất bại ...
 * B4: Thực thi các công việc tiếp theo
 * B5: Thực thi các công việc tiếp theo
 */

function* watchFetchListTaskAction() {
    while (true) {
        yield take(taskTypes.FETCH_TASK);
        yield put(showLoading());
        const resp = yield call(getListTask);
        const { status, data } = resp;
        if (status === STATUS_CODE.SUCCESS) {
            yield put(fetchListTaskSuccess(data));
        } else {
            yield put(fetchListTaskFailed(data));
        }
        yield delay(1000);
        yield put(hideLoading());
    }
}

function* filterTaskSaga({payload}) {
    yield delay(500);
    const { keyword } = payload;
    const list = yield select(state => state.task.listTask);
    const filteredTask = list.filter(task =>
        task.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
    yield put(filterTaskSuccess(filteredTask));
}

function* rootSaga() {
    yield fork(watchFetchListTaskAction);
    yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
}
export default rootSaga;