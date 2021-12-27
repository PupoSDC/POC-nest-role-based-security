import { InstitutionId, Institution } from "src/types/Institution";
import { WorkerId } from "src/types/worker";

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

export const InstitutionsHasWorker : Array<[InstitutionId, WorkerId]> = [
    ["1", "1"],
    ["1", "2"],
    ["2", "3"],
    ["2", "4"],
];

export const InstitutionsHasAdmin : Array<[InstitutionId, WorkerId]> = [
    ["1", "1"],
    ["2", "2"],
];