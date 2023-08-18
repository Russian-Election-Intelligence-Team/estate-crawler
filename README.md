# Скрапер для дом.минжкх

Собирает информацию о количестве квартир в домах.

## Prerequisites

- Node.js
- npm

## Ввод искомых адресов

Адреса домов указываются в файле `storage/key_value_stores/default/INPUT.json` в формате:

```json
{
  "region": "Внуковское",
  "addresses": [
    "Лётчика Грицевца, 4",
    "Лётчика Ульянина, 4"
  ]
}
```

## Running

Install dependancies:
```bash
npm install
```

Run:
```bash
npm start
```
