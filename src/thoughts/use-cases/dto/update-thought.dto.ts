import { CreateThoughtDto } from "./create-thought.dto";

export type UpdateThoughtDto = Omit<CreateThoughtDto, "user_id">;
