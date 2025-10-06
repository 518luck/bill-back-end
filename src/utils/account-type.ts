import { AccountType } from '@/enum/account-type.enum';

export type LoginType = 'username' | AccountType; // username + 枚举类型

export function getAccountType(account: string): LoginType {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  if (emailRegex.test(account)) return AccountType.EMAIL;
  if (phoneRegex.test(account)) return AccountType.PHONE;
  return AccountType.USERNAME;
}
