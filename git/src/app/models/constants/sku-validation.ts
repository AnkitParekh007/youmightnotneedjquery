export const USER_VALIDATION_MESSAGE = {
	CharLengthRangeFailureCount: "Number of attribute values which are not within the character range constraint",
	DatatypeFailureCount: "Number of attribute values having datatype mismatch",
	IsRequiredFailureCount: "Number of attributes having blank value for required constraint",
	LOVFailureCount: "Number of attribute values having LoV mismatch with schema",
	MultiValueFailureCount: "Number of attributes having multiple values for single value constraint",
	NumericRangeFailureCount: "Number of attribute values which are not within the numeric range constraint",
	SkuFailureCount: "Total number of SKUs having validation failures",
	UOMFailureCount: "Number of attribute values having UoM mismatch with schema"
};

export const VALIDATION_CONSTRAINTS = [
	{
		displayName: "Enforce LOV",
		commonMasterKey: "1",
		constraint: "ENFORCE_LOV"
	},
	{
		displayName: "Enforce UOM",
		commonMasterKey: "2",
		constraint: "ENFORCE_UOM"
	},
	{
		displayName: "Enforce Attribute Datatype",
		commonMasterKey: "3",
		constraint: "ENFORCE_ATTRIBUTE_DATATYPE"
	},
	{
		displayName: "Enforce Numeric Range",
		commonMasterKey: "4",
		constraint: "ENFORCE_NUMERIC_RANGE"
	},
	{
		displayName: "Enforce Character Length",
		commonMasterKey: "5",
		constraint: "ENFORCE_CHARACTER_LENGTH"
	},
	{
		displayName: "Is Required",
		commonMasterKey: "6",
		constraint: "IS_REQUIRED"
	},
	{
		displayName: "Disallow Multivalues",
		commonMasterKey: "7",
		constraint: "DISALLOW_MULTIVALUES"
	}
];
