import { fork, take, call, put, delay, takeLatest, takeEvery, select } from 'redux-saga/effects'
import * as taskTypes from '../constants/task';
import { getListTask, addTask, updateTask, deleteTask } from '../apis/task';
import { STATUS_CODE, STATUSES } from '../constants/index';
import { fetchListTaskSuccess, fetchListTaskFailed, addTaskSuccess, addTaskFailed, fetchListTask, updateTaskSuccess, updateTaskFailed, deleteTaskSuccess, deleteTaskFailed } from '../action/task';
import { showLoading, hideLoading } from '../action/ui';
import { hideModal } from '../action/modal';

//takeEvery,select,filterTaskSuccess
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
        const action = yield take(taskTypes.FETCH_TASK); // Khi FETCH_TASK được dispatch => thì code mới dc chạy
        //yield put(showLoading());
        const { params } = action.payload;
        const resp = yield call(getListTask, params);
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


//Tìm kiếm
function* filterTaskSaga({ payload }) {
    yield delay(500);
    const { keyword } = payload;
    yield put(fetchListTask({
        q: keyword
    }));
    // const { keyword } = payload;
    // const list = yield select(state => state.task.listTask);
    // const filteredTask = list.filter(task =>
    //     task.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    // );
    // yield put(filterTaskSuccess(filteredTask));
}


//Thêm
function* addTaskSaga({ payload }) {
    const { title, description } = payload;
    yield put(showLoading());
    const resp = yield call(addTask, {
        title,
        description,
        status: STATUSES[0].value
    });
    const { data, status } = resp;
    if (status === STATUS_CODE.CREATED) {
        yield put(addTaskSuccess(data));
        yield put(hideModal());
    } else {
        yield put(addTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
}

/**
 * select lấy dữ liệu từ store
 */
function* updateTaskSaga({ payload }) {
    const { title, description, status } = payload;
    const taskEditing = yield select(state => state.task.taskEditing);
    yield put(showLoading());
    const resp = yield call(
        updateTask,
        { title, description, status },
        taskEditing.id,
    );
    const { data, status: statusCode } = resp;
    if (statusCode === STATUS_CODE.SUCCESS) {
        yield put(updateTaskSuccess(data));
        yield put(hideModal());
    } else {
        yield put(updateTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
    const { id } = payload;
    yield put(showLoading());
    const resp = yield call(deleteTask, id);
    const { data, status: statusCode } = resp;
    if (statusCode === STATUS_CODE.SUCCESS) {
        yield put(deleteTaskSuccess(id));
        yield put(hideModal());
    } else {
        yield put(deleteTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
}

function* rootSaga() {
    yield fork(watchFetchListTaskAction);
    yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
    yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
    yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
    yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}
export default rootSaga;