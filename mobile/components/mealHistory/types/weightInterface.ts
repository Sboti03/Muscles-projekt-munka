export default interface WeightInterface {
    weight: number | undefined,
    weightDate: Date | undefined
}
export interface WeightHistoryResponse {
    changedAt: Date,
    dayId: number,
    weight: number,
    weightId: number
}