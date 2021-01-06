import { FirebaseInterface } from './Firebase';

interface CompareFunction { (a: any, b: any): number };
interface ObjectKeys { [key: string]: any };
interface CustomReduxAction { type: string, value: any | undefined };

export type {
  CompareFunction,
  CustomReduxAction,
  ObjectKeys,
  FirebaseInterface,
};
