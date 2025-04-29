import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { City, ScoredCity } from "../types/City";
import { Preferences } from "../types/Preferences";
import PreferencesSlider from "./PreferencesSlider";
import { calculateScore } from "../utils/scoreCalculations";

interface ResultsListProps {
    data: Array<City>;
}

// Results list that displays all catalog items filtered by a search
// The data coming in is assumed to be an aggregated superset of all the users saved albums, tracks, and episodes
const ResultsList: FC<ResultsListProps> = ({data}) => {
    const [listData, setListData] = useState<Array<ScoredCity>>([]);
    const [preferences, setPreferences] = useState<Preferences>({
        costOfLivingIndex: 0,
        crimeIndex: 0,
        medianIncome: 0,
        walkabilityScore: 0,
        averageTemperature: 0
    });

    useEffect(() => {
        setListData(data.map(item => {return {
            id: item?.id,
            score: calculateScore(item, preferences),
            name: item?.name,
            costOfLivingIndex: item?.costOfLivingIndex,
            crimeIndex: item?.crimeIndex,
            medianIncome: item?.medianIncome,
            walkabilityScore: item?.walkabilityScore,
            averageTemperature: item?.averageTemperature}}));
    }, [data, preferences]);

    const columnHelper = createColumnHelper<ScoredCity>();
    const columns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.renderValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('score', {
            header: 'Score',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('costOfLivingIndex', {
            header: 'Cost of Living',
            cell: info => info.getValue().value,
            enableSorting: true,
        }),
        columnHelper.accessor('crimeIndex', {
            header: 'Crime',
            cell: info => info.getValue().value,
            enableSorting: true,
        }),
        columnHelper.accessor('medianIncome', {
            header: 'Median Income',
            cell: info => info.getValue().value,
            enableSorting: true
        }),
        columnHelper.accessor('walkabilityScore', {
            header: 'Walkability',
            cell: info => info.getValue().value,
            enableSorting: true
        }),
        columnHelper.accessor('averageTemperature', {
            header: 'Average Temperature',
            cell: info => info.getValue().value,
            enableSorting: true
        })
    ]

    const table = useReactTable({
        data: listData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Box   
            sx={{
                overflowX: 'auto',
                width: '100%',
            }}
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="flex-end"
                gap={2}
                sx={{ mb: 2 }}
            >
                {
                    Object.keys(preferences).map(key => (
                        <PreferencesSlider
                            key={key}
                            label={key}
                            value={preferences[key as keyof Preferences]}
                            onChange={(e, val) => setPreferences(p => ({ ...p, [key]: val as number }))}
                            min={-3}
                            max={3}
                        />
                    ))
                }
            </Box>
            <table style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                        <td style={{
                            textAlign: 'center',
                            padding: '.5rem',
                            border: '1px solid #ccc'
                        }} key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    )
}

export default ResultsList;
