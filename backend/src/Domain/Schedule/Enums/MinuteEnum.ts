export enum MinuteEnum {
  'ONE_CLASS' = 50,
  'ONE_CLASS_AND_HALF' = 75,
  'TWO_CLASSES' = 100
}

export const MinuteEnumLabel: { [keyof in MinuteEnum]: string } = {
  [MinuteEnum.ONE_CLASS]: 'Uma aula',
  [MinuteEnum.ONE_CLASS_AND_HALF]: 'Uma aula e meia',
  [MinuteEnum.TWO_CLASSES]: 'Duas aulas'
}
