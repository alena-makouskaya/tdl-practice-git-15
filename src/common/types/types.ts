
export type FieldError = {
    error: string
    field: string
  }

export type BaseResponce<D = {}> = {
    data: D;
    resultCode: number;
    messages: Array<string>;
    fieldsErrors: Array<FieldError>
  };
  