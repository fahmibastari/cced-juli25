import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  compat.extends('next', 'next/core-web-vitals', 'next/typescript'),
  // Tambahkan aturan custom jika diperlukan
];
