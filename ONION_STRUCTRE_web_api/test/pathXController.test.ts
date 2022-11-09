import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPathService from "../src/services/IServices/IPathService";
import PathController from "../src/controllers/pathController";
import IPathDTO from '../src/dto/IPathDTO';
import { Path } from '../src/domain/path';

describe('path controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let pathSchemaInstance = require("../src/persistence/schemas/pathSchema").default;
		Container.set("pathSchema", pathSchemaInstance);

		let pathRepoClass = require("../src/repos/pathRepo").default;
		let pathRepoInstance = Container.get(pathRepoClass);
		Container.set("PathRepo", pathRepoInstance);

		let pathServiceClass = require("../src/services/pathService").default;
		let pathServiceInstance = Container.get(pathServiceClass);
		Container.set("PathService", pathServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('pathController unit test using pathService stub', async function () {
		// Arrange
        let body = {    "departure_warehouse": "sdadsdsa",
        "arrival_warehouse": "dsasdd",
        "distance": 111,
        "time": 122,
        "energy_used": 5,
        "extra_time": 10 };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let pathServiceInstance = Container.get("PathService");
		sinon.stub(pathServiceInstance, "createPath").returns( Result.ok<IPathDTO>( {"id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
         "distance": req.body.distance, 
        "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time } ));

		const ctrl = new PathController(pathServiceInstance as IPathService);

		// Act
		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
        "distance": req.body.distance, 
       "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time}));
	});


    it('pathController + pathService integration test using pathRepoistory and Path stubs', async function () {	
		// Arrange	
        let body = {     "departure_warehouse": "sdadsdsa",
        "arrival_warehouse": "dsasdd",
        "distance": 111,
        "time": 122,
        "energy_used": 5,
        "extra_time": 10};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Path, "create").returns(Result.ok({"id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
        "distance": req.body.distance, 
       "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time}));

		let pathRepoInstance = Container.get("PathRepo");
		sinon.stub(pathRepoInstance, "save").returns(new Promise<Path>((resolve, reject) => {
			resolve(Path.create({"id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
            "distance": req.body.distance, 
           "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time}).getValue())
		}));

		let pathServiceInstance = Container.get("PathService");

		const ctrl = new PathController(pathServiceInstance as IPathService);

		// Act
		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
        "distance": req.body.distance, 
       "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time}));
	});


    it('pathController + pathService integration test using spy on pathService', async function () {		
		// Arrange
        let body = {     "departure_warehouse": "sdadsdsa",
        "arrival_warehouse": "dsasdd",
        "distance": 111,
        "time": 122,
        "energy_used": 5,
        "extra_time": 10};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let pathRepoInstance = Container.get("PathRepo");
		sinon.stub(pathRepoInstance, "save").returns(new Promise<Path>((resolve, reject) => {
			resolve(Path.create({"id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
            "distance": req.body.distance, 
           "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time}).getValue())
		}));

		let pathServiceInstance = Container.get("PathService");		
		const pathServiceSpy = sinon.spy(pathServiceInstance, "createPath");

		const ctrl = new PathController(pathServiceInstance as IPathService);

		// Act
		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
        "distance": req.body.distance, 
       "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time}));
		sinon.assert.calledOnce(pathServiceSpy);
		//sinon.assert.calledTwice(pathServiceSpy);
		sinon.assert.calledWith(pathServiceSpy, sinon.match({departure_warehouse: req.body.departure_warehouse}));
        sinon.assert.calledWith(pathServiceSpy, sinon.match({arrival_warehouse: req.body.arrival_warehouse}));
        sinon.assert.calledWith(pathServiceSpy, sinon.match({distance: req.body.distance}));
        sinon.assert.calledWith(pathServiceSpy, sinon.match({time: req.body.time}));
        sinon.assert.calledWith(pathServiceSpy, sinon.match({energy_used: req.body.energy_used}));
        sinon.assert.calledWith(pathServiceSpy, sinon.match({extra_time: req.body.extra_time}));
        
	});


    it('pathController unit test using pathService mock', async function () {		
		// Arrange
        let body = {    "departure_warehouse": "sdadsdsa",
        "arrival_warehouse": "dsasdd",
        "distance": 111,
        "time": 122,
        "energy_used": 5,
        "extra_time": 10};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let pathServiceInstance = Container.get("PathService");		
		const pathServiceMock = sinon.mock(pathServiceInstance, "createPath")
		pathServiceMock.expects("createPath")
			.once()
			.withArgs(sinon.match({departure_warehouse: req.body.departure_warehouse, arrival_warehouse: req.body.arrival_warehouse, 
         distance: req.body.distance, 
        time: req.body.time, energy_used: req.body.energy_used, extra_time: req.body.extra_time}))
			.returns(Result.ok<IPathDTO>( {"id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
            "distance": req.body.distance, 
           "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time} ));

		const ctrl = new PathController(pathServiceInstance as IPathService);

		// Act
		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		pathServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", "departure_warehouse": req.body.departure_warehouse, "arrival_warehouse": req.body.arrival_warehouse, 
        "distance": req.body.distance, 
       "time": req.body.time, "energy_used": req.body.energy_used, "extra_time": req.body.extra_time}));
	});
});