import path from 'node:path';
import { FLEET_UI_JSON } from './constants';
import { exists, readJson, writeJson } from './fs';

export type FleetUiConfig = {
	schema: 1;
	aliasPrefix: string;
	coreDir: string;
	componentsDir: string;
	entryFile: string;
};

export function fleetUiJsonPath(projectRoot: string) {
	return path.join(projectRoot, FLEET_UI_JSON);
}

export function readFleetUiConfig(projectRoot: string): FleetUiConfig | null {
	const p = fleetUiJsonPath(projectRoot);
	if (!exists(p)) return null;
	return readJson<FleetUiConfig>(p);
}

export function writeFleetUiConfig(projectRoot: string, cfg: FleetUiConfig) {
	writeJson(fleetUiJsonPath(projectRoot), cfg);
}

