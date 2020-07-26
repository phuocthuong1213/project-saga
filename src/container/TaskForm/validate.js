const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Vui lòng nhập tên';
    } else if (values.title.length > 15) {
        errors.title = 'Tên không được vượt quá 15 ký tự';
    }
    if (!values.description) {
        errors.description = 'Không được để trống mô tả';
    }
    return errors
}

export default validate;