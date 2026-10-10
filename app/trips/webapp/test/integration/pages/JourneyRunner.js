sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"my/travel/trips/test/integration/pages/TripsList.gen",
	"my/travel/trips/test/integration/pages/TripsObjectPage.gen"
], function (JourneyRunner, TripsListGenerated, TripsObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('my/travel/trips') + '/test/flp.html#app-preview',
        pages: {
			onTheTripsListGenerated: TripsListGenerated,
			onTheTripsObjectPageGenerated: TripsObjectPageGenerated
        },
        async: true
    });

    return runner;
});

