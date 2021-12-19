
export class DuplicateError extends Error{
    
    constructor(message?: string){
        super(message);
        this.name = "DuplicateError";
    }
}

export class NotFountError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "NotFoundError"
    }
}
