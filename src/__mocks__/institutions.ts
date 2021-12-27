import { InstitutionId, Institution } from "src/types/Institution";
import { UserId } from "src/types/user";

export const Institutions : Record<InstitutionId, Institution> = {
    "1": {
        id: "1",
        name: "Hopsital da Luz",
        adress: "Benfica"
    },
    "2": {
        id: "2",
        name: "Hospital de santa Maria",
        adress: "Ali ao pe do ribeiro"
    },
};

export const InstitutionsHasWorker : Array<[InstitutionId, UserId]> = [
    ["1", "1"],
    ["1", "2"],
    ["1", "3"],
    ["2", "3"],
    ["2", "4"],
];

export const InstitutionsHasAdmin : Array<[InstitutionId, UserId]> = [
    ["1", "5"],
    ["2", "6"],
];