import { IPathPersistence } from "../../dataschema/IPathPersistence";
import mongoose from "mongoose";

const Path = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },
        departure_warehouse: {
            required: true,
            type: String
        },
        arrival_warehouse: {
            required: true,
            type: String
        },
        distance: {
            required: true,
            type: Number
        },
        time: {
            required: true,
            type: Number
        },
        energy_used: {
            required: true,
            type: Number
        },
        extra_time: {
            required: true,
            type: Number
        }
    },
    { timestamps: true }
);

export default mongoose.model<IPathPersistence & mongoose.Document>("Path", Path);
