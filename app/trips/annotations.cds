using TravelService as service from '../../srv/services';
annotate service.Trips with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'title',
                Value : title,
            },
            {
                $Type : 'UI.DataField',
                Label : 'startDate',
                Value : startDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'endDate',
                Value : endDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'price',
                Value : price,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Destination',
                Value : destination_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Bookings',
            ID : 'Bookings',
            Target : 'bookings/@UI.LineItem#Bookings',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'title',
            Value : title,
        },
        {
            $Type : 'UI.DataField',
            Label : 'startDate',
            Value : startDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'endDate',
            Value : endDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'price',
            Value : price,
        },
    ],
    UI.SelectionFields : [
        title,
        price,
        startDate,
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : title,
        },
        TypeName : 'Trip',
        TypeNamePlural : 'Trips',
    },
);

annotate service.Trips with {
    destination @(
        Common.Text : destination.name,
        Common.TextArrangement : #TextOnly,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Destinations',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : destination_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'country',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'description',
                },
            ],
        },
        Common.Label : 'Destination',
    )
};

annotate service.Trips with {
    title @Common.Label : 'title'
};

annotate service.Bookings with @(
    UI.LineItem #Bookings : [
        {
            $Type : 'UI.DataField',
            Value : bookingNo,
            Label : 'bookingNo',
        },
        {
            $Type : 'UI.DataField',
            Value : bookingDate,
            Label : 'bookingDate',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
        {
            $Type : 'UI.DataField',
            Value : traveler.email,
            Label : 'email',
        },
        {
            $Type : 'UI.DataField',
            Value : traveler.firstName,
            Label : 'firstName',
        },
        {
            $Type : 'UI.DataField',
            Value : traveler.lastName,
            Label : 'lastName',
        },
    ]
);

annotate service.Trips with {
    price @Common.Label : 'price'
};

annotate service.Trips with {
    startDate @Common.Label : 'startDate'
};

annotate service.Destinations with {
    ID @(
        Common.Text : name,
        Common.TextArrangement : #TextOnly
    )
};

