// https://documentation.sourcepoint.com/web-implementation/sourcepoint-gdpr-and-tcf-v2-support/__tcfapi-getcustomvendorconsents-api#data-the-__tcfapi-getcustomconsentdata-api-returns

export interface CustomVendorConsents {
	/**
	 * returns information on the purposes a users has consented to
	 * includes IAB TCFv2 Purposes and Custom Purposes
	 * _id - Sourcepoint internal Purpose ID, specific to each vendor list
	 * name - Sourcepoint Purpose Name as defined in each vendor list
	 */
	consentedPurposes: {
		_id: string;
		name: string;
	};

	/**
	 * returns information on the vendors a users has consented to
	 * includes Custom Purposes
	 * _id - Sourcepoint internal vendor ID, unique across vendor list
	 * name - Sourcepoint internal Vendor Name
	 */
	consentedVendors: {
		_id: string;
		name: string;
		vendorType: string;
	};

	/**
	 * returns information on purposes that are mapped to a vendor
	 * purposeGrants - indicates the consent and legitimate interest status for all purposes that are mapped to a vendor
	 * vendorGrant - indicates if a vendor has consent or legitimate interest for all purposes the vendor is matched to
	 */
	grants: Record<
		string,
		{
			purposeGrants: Record<string, boolean>;
			vendorGrant: boolean;
		}
	>;

	/**
	 * returns information on the purposes that are classified as legitimate interest in the vendor list
	 * includes IAB TCFv2 Purposes and Custom legitimate interest Purposes a user has not objected to
	 * _id - Sourcepoint internal Purpose ID, specific to each vendor list
	 * name - Sourcepoint Purpose Name as defined in each vendor list
	 */
	legIntPurposes: {
		_id: string;
		name: string;
	};
}
