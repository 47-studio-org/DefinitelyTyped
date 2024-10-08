import * as express from "express";
import {
    collection,
    CollectionOptions,
    Filter,
    init,
    LianaOptions,
    Page,
    Params,
    PermissionMiddlewareCreator,
    PUBLIC_ROUTES,
    RecordCreator,
    RecordGetter,
    RecordRemover,
    RecordsCounter,
    RecordSerializer,
    RecordsGetter,
    RecordsRemover,
    RecordUpdater,
    SmartActionOptions,
    SmartFieldOptions,
    SmartSegmentOptions,
    StatSerialized,
    StatSerializer,
} from "forest-express-mongoose";
import * as mongoose from "mongoose";

const lianaOptions: LianaOptions = {
    objectMapping: mongoose,
    envSecret: "aSecretKey",
    authSecret: "aSecretKey",
    connections: {
        "main-connection": mongoose.createConnection("uri"),
    },
    includedModels: ["aModel"],
    excludedModels: ["aModel"],
    configDir: "aDirectory",
};

init(lianaOptions).then((expressApplication: express.Application) => {
    const expressApp: express.Application = expressApplication;
});

const MY_PUBLIC_ROUTES = PUBLIC_ROUTES;

const model = {
    name: "my-model",
};

const page: Page = {
    number: "1",
    size: "10",
};

const filter: Filter = {
    field: "my-field",
    operator: "is",
    value: "empty",
};

const params: Params = {
    timezone: "EU",
    search: "",
    fields: {
        users: "createdAt,firstname,id,lastname,updatedAt",
    },
    sort: "ASC",
    filters: filter,
    page,
    searchExtended: "0",
};

const recordGetter = new RecordGetter(model);
recordGetter.get("1234");

const recordsGetter = new RecordsGetter(model);
recordsGetter.getAll(params);

const recordsCounter = new RecordsCounter(model);
recordsCounter.count(params);

const recordUpdater = new RecordUpdater(model);
recordUpdater.update({}, "1234");

const recordCreator = new RecordCreator(model);
recordCreator.create({});

const recordRemover = new RecordRemover(model);
recordRemover.remove("1234");

const recordsRemover = new RecordsRemover(model);
recordsRemover.remove(["1234", "5678"]);

const recordSerializer = new RecordSerializer(model);
recordSerializer.serialize([{}, {}]).then((statSerialized: StatSerialized) => {});

let requestHandler: express.RequestHandler;
const permissionMiddlewareCreator = new PermissionMiddlewareCreator("users");
requestHandler = permissionMiddlewareCreator.list();
requestHandler = permissionMiddlewareCreator.export();
requestHandler = permissionMiddlewareCreator.details();
requestHandler = permissionMiddlewareCreator.create();
requestHandler = permissionMiddlewareCreator.update();
requestHandler = permissionMiddlewareCreator.delete();
requestHandler = permissionMiddlewareCreator.smartAction();

let statSerialized: StatSerialized;
const stats = {
    value: [1, 2, 3],
};
const statSerializer = new StatSerializer(stats);
statSerialized = statSerializer.perform();

collection("simpleCollection", {});

const fields: SmartFieldOptions[] = [{
    field: "simple-field",
    type: "boolean",
}];
const actions: SmartActionOptions[] = [{
    name: "simple-action",
}];
const segments: SmartSegmentOptions[] = [{
    name: "simple-segment",
    where: () => ({}),
}];
const simpleCollectionOptions: CollectionOptions = {
    fields,
    actions,
    segments,
};
collection("simpleCollection", simpleCollectionOptions);

const complexCollectionOptions: CollectionOptions = {
    fields: [{
        field: "complex-field",
        type: "String",
        description: "a-complex-field",
        isReadOnly: false,
        enums: ["one", "two", "three"],
        defaultValue: ["one"],
        get: (record) => {
            return `${record.lastName} ${record.firstName}`;
        },
        set: (record) => {
            const [lastName, firstName] = record.fullName.split(" ");

            record.lastName = lastName;
            record.firstName = firstName;

            return record;
        },
        search: (query, search) => {
            query.where = {
                firstName: {
                    like: search,
                },
            };

            return query;
        },
    }, {
        field: "complex-field-2",
        type: ["Number"],
        description: "a-complex-field-2",
        isReadOnly: false,
        enums: ["1", "2", "3"],
        defaultValue: ["one"],
        get: (record) => {
            return "2";
        },
        set: (record) => {
            record.duplicate = "2";

            return record;
        },
        search: (query, search) => {
            query.where = {
                duplicate: {
                    is: search,
                },
            };

            return query;
        },
    }],
    actions: [{
        name: "complex-action",
        type: "single",
        fields: [{
            field: "complex-field",
            type: "string",
            enums: ["one", "two", "three"],
            description: "complex-description",
            isRequired: true,
        }, {
            field: "complex-field-2",
            type: "string",
            reference: "complex-collection-2",
            description: "complex-description",
            isRequired: true,
        }],
    }, {
        name: "complex-action",
        type: "bulk",
        fields: [{
            field: "complex-field",
            type: "string",
            enums: ["one", "two", "three"],
            description: "complex-description",
            isRequired: true,
        }],
        endpoint: "complex-endpoint",
        httpMethod: "POST",
        download: false,
        values: (record) => {
            return {
                "complex-field": record.belongsToId,
            };
        },
    }],
    segments: [{
        name: "complex-segment",
        where: (record) => {
            return {
                id: {
                    in: record.hasManyIds,
                },
            };
        },
    }],
};
collection("complexCollection", complexCollectionOptions);

const app = express();

app.get("/", async (request, response) => {
    response.send(await recordsGetter.getIdsFromRequest(request));
});
