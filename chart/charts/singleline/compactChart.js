import {ChartBase} from '../../base/chartBase';

export class CompactChart extends ChartBase {
	resize() {
		throw new Error('Compact charts cant be resized');
	}
}
