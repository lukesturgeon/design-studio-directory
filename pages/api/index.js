import Papa from "papaparse";
import { get } from "axios";
import { getStudios, getLocations } from "../../dataHelpers";

const SPREADSHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrmesVzQkYTyU3DNuziD7C-h8hYmC9SGpiDDa9Em_tm0WCkobF1rZWjR4BW15hu9QALeEgfIofSeI-/pub?output=csv";

export default async (req, res) => {
  try {
    const { data } = await get(SPREADSHEET_URL);
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data;
        const studios = getStudios(data);
        const locations = getLocations(studios);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ studios, locations }));
      },
    });
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
};
