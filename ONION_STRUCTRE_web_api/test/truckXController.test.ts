import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ITruckService from "../src/services/IServices/ITruckService";
import TruckController from "../src/controllers/truckController";
import ITruckDTO from '../src/dto/ITruckDTO';
import { Truck } from '../src/domain/truck';

describe('truck controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let truckSchemaInstance = require("../src/persistence/schemas/truckSchema").default;
		Container.set("truckSchema", truckSchemaInstance);

		let truckRepoClass = require("../src/repos/truckRepo").default;
		let truckRepoInstance = Container.get(truckRepoClass);
		Container.set("TruckRepo", truckRepoInstance);

		let truckServiceClass = require("../src/services/truckService").default;
		let truckServiceInstance = Container.get(truckServiceClass);
		Container.set("TruckService", truckServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('truckController unit test using truckService stub', async function () {
		// Arrange
        let body = {     "tare": 11,
        "load_capacity": 12,
        "maximum_battery_charge": 5,
        "autonomy_when_fully_charged": 10,
        "fast_charging_time": 7 };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let truckServiceInstance = Container.get("TruckService");
		sinon.stub(truckServiceInstance, "createTruck").returns( Result.ok<ITruckDTO>( {"id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
        "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time } ));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
        "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time}));
	});


    it('truckController + truckService integration test using truckRepoistory and Truck stubs', async function () {	
		// Arrange	
        let body = {     "tare": 11,
        "load_capacity": 12,
        "maximum_battery_charge": 5,
        "autonomy_when_fully_charged": 10,
        "fast_charging_time": 7 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Truck, "create").returns(Result.ok({"id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
        "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time}));

		let truckRepoInstance = Container.get("TruckRepo");
		sinon.stub(truckRepoInstance, "save").returns(new Promise<Truck>((resolve, reject) => {
			resolve(Truck.create({"id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
            "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time}).getValue())
		}));

		let truckServiceInstance = Container.get("TruckService");

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
        "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time}));
	});


    it('truckController + truckService integration test using spy on trucktruckService', async function () {		
		// Arrange
        let body = { "tare": 11,
        "load_capacity": 12,
        "maximum_battery_charge": 5,
        "autonomy_when_fully_charged": 10,
        "fast_charging_time": 7  };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let truckRepoInstance = Container.get("TruckRepo");
		sinon.stub(truckRepoInstance, "save").returns(new Promise<Truck>((resolve, reject) => {
			resolve(Truck.create({"id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
            "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time}).getValue())
		}));

		let truckServiceInstance = Container.get("TruckService");		
		const truckServiceSpy = sinon.spy(truckServiceInstance, "createTruck");

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
        "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time}));
		sinon.assert.calledOnce(truckServiceSpy);
		//sinon.assert.calledTwice(truckServiceSpy);
		sinon.assert.calledWith(truckServiceSpy, sinon.match({tare: req.body.tare}));
        sinon.assert.calledWith(truckServiceSpy, sinon.match({load_capacity: req.body.load_capacity}));
        sinon.assert.calledWith(truckServiceSpy, sinon.match({maximum_battery_charge: req.body.maximum_battery_charge}));
        sinon.assert.calledWith(truckServiceSpy, sinon.match({autonomy_when_fully_charged: req.body.autonomy_when_fully_charged}));
        sinon.assert.calledWith(truckServiceSpy, sinon.match({fast_charging_time: req.body.fast_charging_time}));
        
	});


    it('truckController unit test using truckService mock', async function () {		
		// Arrange
        let body = {"tare": 11,
        "load_capacity": 12,
        "maximum_battery_charge": 5,
        "autonomy_when_fully_charged": 10,
        "fast_charging_time": 7   };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let truckServiceInstance = Container.get("TruckService");		
		const truckServiceMock = sinon.mock(truckServiceInstance, "createTruck")
		truckServiceMock.expects("createTruck")
			.once()
			.withArgs(sinon.match({tare: req.body.tare, load_capacity: req.body.load_capacity, maximum_battery_charge: req.body.maximum_battery_charge,
                autonomy_when_fully_charged: req.body.autonomy_when_fully_charged, fast_charging_time: req.body.fast_charging_time}))
			.returns(Result.ok<ITruckDTO>( {"id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
            "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time} ));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		truckServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", "tare": req.body.tare, "load_capacity": req.body.load_capacity, 
        "maximum_battery_charge": req.body.maximum_battery_charge, "autonomy_when_fully_charged": req.body.autonomy_when_fully_charged, "fast_charging_time": req.body.fast_charging_time}));
	});
});