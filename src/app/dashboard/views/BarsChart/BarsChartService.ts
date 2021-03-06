import {Injectable} from "angular2/core";
import {BarsChartItem} from "./BarItemModel";
import {BarsChartOptions} from "./BarsChartOptions";
import {Conditional} from "../../conditional/Conditional";

@Injectable()
export class BarsChartService{
	DEFAULT_SETTINGS:BarsChartOptions = {
		min: 0,
		valueProperty: "value"
	};

	parseOptions(options?:BarsChartOptions){
		let parsedOptions = Object.assign({}, this.DEFAULT_SETTINGS, options);

		Object.assign(parsedOptions, {
			getValue: this.prepareGetItemValue(parsedOptions),
			getColor: this.prepareGetItemColor(parsedOptions),
			formatValue: this.prepareGetValueDisplay(parsedOptions)
		});

		return parsedOptions;
	}

	parseBarsData(data:Array<any>, options:BarsChartOptions){
		let parsedData:Array<BarsChartItem> = data.map((item, i:number) => {
			return {
				value: options.getValue(item),
				name: item.name,
				item: item,
				size: 0,
				valueDisplay: null
			};
		}).sort(function(a, b){
			if (a.value === b.value)
				return 0;

			return a.value < b.value ? 1 : -1;
		});

		let minValue:number = !isNaN(options.min) ? options.min : parsedData[parsedData.length - 1].value;
		let maxValue:number = !isNaN(options.max) ? options.max : parsedData[0].value;
		let sizeDelta = maxValue - minValue;

		parsedData = parsedData.map((item, i:number) => {
			return Object.freeze(Object.assign(item, {
				color: options.getColor && options.getColor(item, i),
				size: item.value / sizeDelta,
				valueDisplay: options.formatValue(item.value, item)
			}));
		});

		return {
			data: parsedData,
			minValue,
			maxValue
		};
	}

	private prepareGetItemValue(options:BarsChartOptions):(item:any) => number{
		if (options.getValue)
			return options.getValue;

		if (options.valueProperty) {
			return (item:any) => {
				return item[options.valueProperty];
			};
		}
	}

	private prepareGetItemColor(options:BarsChartOptions): (item:BarsChartItem, index:number) => string{
		if (options.getColor)
			return options.getColor;

		if (options.color){
			if (options.color.conditional){
				var colorConditional = new Conditional(options.color.conditional);

				return (item:BarsChartItem):string => {
					return colorConditional.getValue(item.value);
				};
			}

			if (options.color.pattern){
				return (item:BarsChartItem, index:number) => {
					if (options.color.pattern.length === 1)
						return options.color.pattern[0];

					return options.color.pattern[index % options.color.pattern.length];
				}
			}

			if (options.color.value)
				return () => { return options.color.value; };
		}

		return null;
	}

	private prepareGetValueDisplay(options:BarsChartOptions): (value:any, item:any) => string{
		if (options.formatValue)
			return options.formatValue;

		return (value, item) => { return item.value.toString() };
	}
}