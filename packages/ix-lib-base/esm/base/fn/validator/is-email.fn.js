import { isBlank } from './is-blank.fn';
const EMAIL_REG_EXP = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\\.[A-Za-z0-9-]+)*((\\.[A-Za-z0-9]{2,})|(\\.[A-Za-z0-9]{2,}\\.[A-Za-z0-9]{2,}))$');
/**
 * 是否符合單一email格式
 */
export function isEmail(val) {
    if (isBlank(val)) {
        return false;
    }
    if (EMAIL_REG_EXP.exec(val) == null) {
        return false;
    }
    return true;
}
