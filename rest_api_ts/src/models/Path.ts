import mongoose, { Document, Schema } from 'mongoose';

export interface IPath {
    departure_warehouse: string;
    arrival_warehouse: string;
    distance: number;
    time: number;
    energy_used: number;
    extra_time: number;
}

export interface IPathModel extends IPath, Document {}

const PathSchema: Schema = new Schema(
    {
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
    {
        versionKey: false
    }
);

export default mongoose.model<IPathModel>('Path', PathSchema);
