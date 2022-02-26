export const presence = (v) => {
  if (v === 0) {
    return true
  }
  return !!v || ''
}

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

const [precision, scale] = [10, 2]
export const decimal = (v) => {
  const nums = String(v).split('.')
  if (nums[1]) {
    // 小数部分が存在する場合
    return ((nums[0].length + nums[1].length) <= precision && nums[1].length <= scale) || `${precision}桁以内かつ小数点${scale}以内で入力して下さい`
  }
  return nums[0].length <= precision || `${precision}桁以内で入力して下さい`
}
