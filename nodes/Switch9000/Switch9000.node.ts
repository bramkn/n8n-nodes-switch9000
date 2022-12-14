import { IExecuteFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeParameters,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeParameterValue,
} from 'n8n-workflow';

export class Switch9000 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Switch 9000',
		name: 'switch9000',
		subtitle: '={{$parameter["nodeMode"] ==="sender" ? $parameter["nodeMode"] : $parameter["nodeMode"]+ ": " + $parameter["routeIndex"]}}',
		group: ['transform'],
		version: 1,
		icon: 'file:s9000.svg',
		description: 'Switch node with more outputs.',
		defaults: {
			name: 'Switch9000',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Node Mode',
				name: 'nodeMode',
				type: 'options',
				options: [
					{
						name: 'Sender',
						value: 'sender',
					},
					{
						name: 'Receiver',
						value: 'receiver',
					},
				],
				default: 'receiver',
				description: 'Weither the node will act like a Sender or receiver for the switch functionality',
			},
			{
				displayName: 'Route Index',
				name: 'routeIndex',
				type: 'number',
				default: 0,
				displayOptions:{
					show:	{
						nodeMode: [
							'receiver',
						],
					},
				},
				description: 'The index of the route',
			},
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{
						name: 'Expression',
						value: 'expression',
						description: 'Expression decides how to route data',
					},
					{
						name: 'Rules',
						value: 'rules',
						description: 'Rules decide how to route data',
					},
				],
				displayOptions:{
					show:	{
						nodeMode: [
							'sender',
						],
					},
				},
				default: 'rules',
				description: 'How data should be routed',
			},

			// ----------------------------------
			//         mode:expression
			// ----------------------------------
			{
				displayName: 'Output',
				name: 'output',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 3,
				},
				displayOptions: {
					show: {
						mode: ['expression'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: 0,
				description: 'The index of output to which to send data to',
			},

			// ----------------------------------
			//         mode:rules
			// ----------------------------------
			{
				displayName: 'Data Type',
				name: 'dataType',
				type: 'options',
				displayOptions: {
					show: {
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				options: [
					{
						name: 'Boolean',
						value: 'boolean',
					},
					{
						name: 'Date & Time',
						value: 'dateTime',
					},
					{
						name: 'Number',
						value: 'number',
					},
					{
						name: 'String',
						value: 'string',
					},
				],
				default: 'number',
				description: 'The type of data to route on',
			},

			// ----------------------------------
			//         dataType:boolean
			// ----------------------------------
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'boolean',
				displayOptions: {
					show: {
						dataType: ['boolean'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: 'The value to compare with the first one',
			},
			{
				displayName: 'Routing Rules',
				name: 'rules',
				placeholder: 'Add Routing Rule',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						dataType: ['boolean'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: {},
				options: [
					{
						name: 'rules',
						displayName: 'Boolean',
						values: [
							// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								options: [
									{
										name: 'Equal',
										value: 'equal',
									},
									{
										name: 'Not Equal',
										value: 'notEqual',
									},
								],
								default: 'equal',
								description: 'Operation to decide where the the data should be mapped to',
							},
							{
								displayName: 'Value 2',
								name: 'value2',
								type: 'boolean',
								default: false,
								// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
								description: 'The value to compare with the first one',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'number',
								typeOptions: {
									minValue: 0,
								},
								default: 0,
								description: 'The index of output to which to send data to if rule matches',
							},
						],
					},
				],
			},

			// ----------------------------------
			//         dataType:dateTime
			// ----------------------------------
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'dateTime',
				displayOptions: {
					show: {
						dataType: ['dateTime'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: '',
				description: 'The value to compare with the second one',
			},
			{
				displayName: 'Routing Rules',
				name: 'rules',
				placeholder: 'Add Routing Rule',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						dataType: ['dateTime'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: {},
				options: [
					{
						name: 'rules',
						displayName: 'Dates',
						values: [
							// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								options: [
									{
										name: 'Occurred After',
										value: 'after',
									},
									{
										name: 'Occurred Before',
										value: 'before',
									},
								],
								default: 'after',
								description: 'Operation to decide where the the data should be mapped to',
							},
							{
								displayName: 'Value 2',
								name: 'value2',
								type: 'dateTime',
								default: 0,
								description: 'The value to compare with the first one',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'number',
								typeOptions: {
									minValue: 0,
								},
								default: 0,
								description: 'The index of output to which to send data to if rule matches',
							},
						],
					},
				],
			},

			// ----------------------------------
			//         dataType:number
			// ----------------------------------
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'number',
				displayOptions: {
					show: {
						dataType: ['number'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: 0,
				description: 'The value to compare with the second one',
			},
			{
				displayName: 'Routing Rules',
				name: 'rules',
				placeholder: 'Add Routing Rule',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						dataType: ['number'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: {},
				options: [
					{
						name: 'rules',
						displayName: 'Numbers',
						values: [
							// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
								options: [
									{
										name: 'Smaller',
										value: 'smaller',
									},
									{
										name: 'Smaller Equal',
										value: 'smallerEqual',
									},
									{
										name: 'Equal',
										value: 'equal',
									},
									{
										name: 'Not Equal',
										value: 'notEqual',
									},
									{
										name: 'Larger',
										value: 'larger',
									},
									{
										name: 'Larger Equal',
										value: 'largerEqual',
									},
								],
								default: 'smaller',
								description: 'Operation to decide where the the data should be mapped to',
							},
							{
								displayName: 'Value 2',
								name: 'value2',
								type: 'number',
								default: 0,
								description: 'The value to compare with the first one',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'number',
								typeOptions: {
									minValue: 0,
								},
								default: 0,
								description: 'The index of output to which to send data to if rule matches',
							},
						],
					},
				],
			},

			// ----------------------------------
			//         dataType:string
			// ----------------------------------
			{
				displayName: 'Value 1',
				name: 'value1',
				type: 'string',
				displayOptions: {
					show: {
						dataType: ['string'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: '',
				description: 'The value to compare with the second one',
			},
			{
				displayName: 'Routing Rules',
				name: 'rules',
				placeholder: 'Add Routing Rule',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						dataType: ['string'],
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: {},
				options: [
					{
						name: 'rules',
						displayName: 'Strings',
						values: [
							// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
								options: [
									{
										name: 'Contains',
										value: 'contains',
									},
									{
										name: 'Not Contains',
										value: 'notContains',
									},
									{
										name: 'Ends With',
										value: 'endsWith',
									},
									{
										name: 'Not Ends With',
										value: 'notEndsWith',
									},
									{
										name: 'Equal',
										value: 'equal',
									},
									{
										name: 'Not Equal',
										value: 'notEqual',
									},
									{
										name: 'Regex Match',
										value: 'regex',
									},
									{
										name: 'Regex Not Match',
										value: 'notRegex',
									},
									{
										name: 'Starts With',
										value: 'startsWith',
									},
									{
										name: 'Not Starts With',
										value: 'notStartsWith',
									},
								],
								default: 'equal',
								description: 'Operation to decide where the the data should be mapped to',
							},
							{
								displayName: 'Value 2',
								name: 'value2',
								type: 'string',
								displayOptions: {
									hide: {
										operation: ['regex', 'notRegex'],
									},
								},
								default: '',
								description: 'The value to compare with the first one',
							},
							{
								displayName: 'Regex',
								name: 'value2',
								type: 'string',
								displayOptions: {
									show: {
										operation: ['regex', 'notRegex'],
									},
								},
								default: '',
								placeholder: '/text/i',
								description: 'The regex which has to match',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'number',
								typeOptions: {
									minValue: 0,
								},
								default: 0,
								description: 'The index of output to which to send data to if rule matches',
							},
						],
					},
				],
			},

			// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
			{
				displayName: 'Fallback Output',
				name: 'fallbackOutput',
				type: 'number',
				displayOptions: {
					show: {
						mode: ['rules'],
						nodeMode: [
							'sender',
						],
					},
				},
				default: 0,
				description: 'The output to which to route all items which do not match any of the rules',
			},
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];

		const items = this.getInputData();

		let compareOperationResult: boolean;
		let item: INodeExecutionData;
		let mode: string;
		let outputIndex: number;
		let ruleData: INodeParameters;
		let value1: NodeParameterValue, value2: NodeParameterValue;

		// The compare operations
		const compareOperationFunctions: {
			[key: string]: (value1: NodeParameterValue, value2: NodeParameterValue) => boolean;
		} = {
			after: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 || 0) > (value2 || 0),
			before: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 || 0) < (value2 || 0),
			contains: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 || '').toString().includes((value2 || '').toString()),
			notContains: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				!(value1 || '').toString().includes((value2 || '').toString()),
			endsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 as string).endsWith(value2 as string),
			notEndsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				!(value1 as string).endsWith(value2 as string),
			equal: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 === value2,
			notEqual: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 !== value2,
			larger: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 || 0) > (value2 || 0),
			largerEqual: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 || 0) >= (value2 || 0),
			smaller: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 || 0) < (value2 || 0),
			smallerEqual: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 || 0) <= (value2 || 0),
			startsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				(value1 as string).startsWith(value2 as string),
			notStartsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
				!(value1 as string).startsWith(value2 as string),
			regex: (value1: NodeParameterValue, value2: NodeParameterValue) => {
				const regexMatch = (value2 || '').toString().match(new RegExp('^/(.*?)/([gimusy]*)$'));

				let regex: RegExp;
				if (!regexMatch) {
					regex = new RegExp((value2 || '').toString());
				} else if (regexMatch.length === 1) {
					regex = new RegExp(regexMatch[1]);
				} else {
					regex = new RegExp(regexMatch[1], regexMatch[2]);
				}

				return !!(value1 || '').toString().match(regex);
			},
			notRegex: (value1: NodeParameterValue, value2: NodeParameterValue) => {
				const regexMatch = (value2 || '').toString().match(new RegExp('^/(.*?)/([gimusy]*)$'));

				let regex: RegExp;
				if (!regexMatch) {
					regex = new RegExp((value2 || '').toString());
				} else if (regexMatch.length === 1) {
					regex = new RegExp(regexMatch[1]);
				} else {
					regex = new RegExp(regexMatch[1], regexMatch[2]);
				}

				return !(value1 || '').toString().match(regex);
			},
		};

		// Converts the input data of a dateTime into a number for easy compare
		const convertDateTime = (value: NodeParameterValue): number => {
			let returnValue: number | undefined = undefined;
			if (typeof value === 'string') {
				returnValue = new Date(value).getTime();
			} else if (typeof value === 'number') {
				returnValue = value;
			}
			if ((value as unknown as object) instanceof Date) {
				returnValue = (value as unknown as Date).getTime();
			}

			if (returnValue === undefined || isNaN(returnValue)) {
				throw new NodeOperationError(
					this.getNode(),
					`The value "${value}" is not a valid DateTime.`,
				);
			}

			return returnValue;
		};

		const checkIndexRange = (index: number) => {
			if (index < 0) {
				throw new NodeOperationError(
					this.getNode(),
					`The ouput ${index} is not allowed. It has to be between 0 and over 9000!`,
				);
			}
		};
		const nodeMode = this.getNodeParameter('nodeMode', 0) as string;
		if(nodeMode==="sender"){
			// Itterate over all items to check to which output they should be routed to
			itemLoop: for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
				try {
					item = items[itemIndex];
					mode = this.getNodeParameter('mode', itemIndex) as string;

					if (mode === 'expression') {
						// One expression decides how to route item

						outputIndex = this.getNodeParameter('output', itemIndex) as number;
						checkIndexRange(outputIndex);
						item.json = {
							route:outputIndex,
							data:item.json,
						};

						returnData.push(item);
					} else if (mode === 'rules') {
						// Rules decide how to route item

						const dataType = this.getNodeParameter('dataType', 0) as string;

						value1 = this.getNodeParameter('value1', itemIndex) as NodeParameterValue;
						if (dataType === 'dateTime') {
							value1 = convertDateTime(value1);
						}

						for (ruleData of this.getNodeParameter(
							'rules.rules',
							itemIndex,
							[],
						) as INodeParameters[]) {
							// Check if the values passes

							value2 = ruleData.value2 as NodeParameterValue;
							if (dataType === 'dateTime') {
								value2 = convertDateTime(value2);
							}

							compareOperationResult = compareOperationFunctions[ruleData.operation as string](
								value1,
								value2,
							);

							if (compareOperationResult === true) {
								// If rule matches add it to the correct output and continue with next item
								checkIndexRange(ruleData.output as number);
								item.json = {
									route:ruleData.output,
									data:item.json,
								};
								returnData.push(item);
								continue itemLoop;
							}
						}

						// Check if a fallback output got defined and route accordingly
						outputIndex = this.getNodeParameter('fallbackOutput', itemIndex) as number;
						if (outputIndex !== -1) {
							checkIndexRange(outputIndex);
							item.json = {
								route:outputIndex,
								data:item.json,
							};
							returnData.push(item);
						}
					}
				} catch (error) {
					if (this.continueOnFail()) {
						returnData.push({ json: { error: error.message } });
						continue;
					}
					throw error;
				}
			}
		}
		if(nodeMode === "receiver"){
			const routeIndex = this.getNodeParameter('routeIndex', 0) as number;
			const filtered = items.filter(x => x.json.route === routeIndex).map( item => {
				return {binary:item.binary,json:item.json.data, pairedItem: item.pairedItem} as INodeExecutionData;
			});
			returnData.push.apply(returnData,filtered);

		}
		return this.prepareOutputData(returnData);
		//return returnData;
	}
}
