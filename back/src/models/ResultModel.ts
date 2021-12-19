import IDictionary from "./Dictionary";

export default class ResultModel<X = any, Y = string, Z = any> {
  constructor(model: X, errors?: IDictionary<Y>, params?: IDictionary<Z>) {
    this.model = model;
    // @ts-ignore
    this.errors = errors;
    // @ts-ignore
    this.params = params;
    this.isValid = !this.errors?.any();
  }

  model: X;
  errors: IDictionary<Y>;
  params: IDictionary<Z>;
  isValid: boolean;
}
