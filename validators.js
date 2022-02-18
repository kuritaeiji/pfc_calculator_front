export const presence = v => !!v || ''

export const shorter = (length) => {
  return v => (!!v && v.length <= length) || `${length}文字以内で入力して下さい`
}

export const longer = (length) => {
  return v => (!!v && v.length >= length) || `${length}文字以上入力して下さい`
}

const emailRegexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/
export const email = v => (!!v && emailRegexp.test(v)) || '有効なメールアドレスを入力して下さい'

const passwordRegexp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w-]+/
export const password = v => (!!v && passwordRegexp.test(v)) || '大文字英字、小文字英字、数字の3種類を含めて下さい'
