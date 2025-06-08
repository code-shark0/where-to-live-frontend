import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, SortingState } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from "@mui/material";
import { InjectedCity, ScoredCity } from "../types/City";
import { Preferences } from "../types/Preferences";
import PreferencesSlider from "./PreferencesSlider";
import { calculateScore } from "../utils/scoreCalculations";


interface ResultsListProps {
    cityData: Array<InjectedCity>;
    preferences: Preferences;
    onSetPreferences: (updater: (prevState: Preferences) => Preferences) => void;
}

// Results list that displays all catalog items filtered by a search
// The data coming in is assumed to be an aggregated superset of all the users saved albums, tracks, and episodes
const ResultsList: FC<ResultsListProps> = ({cityData, preferences, onSetPreferences}) => {
    const [listData, setListData] = useState<Array<ScoredCity>>([]);

    useEffect(() => {
        setListData(cityData.map(item => {return {
            ...item,
            score: calculateScore(item, preferences),
            rank: 1,
        }}));
    }, [cityData, preferences]);

    const columnHelper = createColumnHelper<ScoredCity>();
    const columns = [
        // columnHelper.accessor('rank', {
        //     header: 'Rank',
        //     cell: info => info.getValue(),
        //     enableSorting: true,
        // }),
        columnHelper.accessor('name', {
            header: 'City',
            cell: info => info.renderValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('score', {
            header: 'Score',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor(row => row.costOfLivingIndex.value, {
            id: 'costOfLivingIndex',
            header: 'Cost of Living',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor(row => row.crimeIndex.value, {
            id: 'crimeIndex',
            header: 'Crime',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor(row => row.medianIncome.value, {
            id: 'medianIncome',
            header: 'Median Income',
            cell: info => info.getValue(),
            enableSorting: true
        }),
        columnHelper.accessor(row => row.walkabilityScore.value, {
            id: 'walkabilityScore',
            header: 'Walkability',
            cell: info => info.getValue(),
            enableSorting: true
        }),
        columnHelper.accessor(row => row.averageAnnualTemperature.value, {
            id: 'averageAnnualTemperature',
            header: 'Average Annual Temperature',
            cell: info => info.getValue(),
            enableSorting: true
        })
    ]

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: listData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

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
                    Object.keys(preferences).map(key => {
                        return (
                            <PreferencesSlider
                                key={key}
                                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, char => char.toUpperCase())}
                                value={preferences[key as keyof Preferences]}
                                onChange={(e, val) => onSetPreferences(p => ({ ...p, [key]: val as number }))}
                                min={-3}
                                max={3}
                            />
                        )

                    })
                }
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="results table">
                    <TableHead sx={{ backgroundColor: 'primary.main' }}>
                        {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                            <TableCell
                                key={header.id}
                                sortDirection={header.column.getIsSorted() === 'asc' ? 'asc' : header.column.getIsSorted() === 'desc' ? 'desc' : false}
                                sx={{ 
                                    cursor: header.column.getCanSort() ? 'pointer' : 'default', 
                                    userSelect: 'none',
                                    fontWeight: 'bold',
                                    color: 'common.white'
                                }}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : (
                                        <TableSortLabel
                                            active={!!header.column.getIsSorted()}
                                            direction={header.column.getIsSorted() === 'asc' ? 'asc' : 'desc'}
                                            onClick={header.column.getToggleSortingHandler()}
                                            sx={{ 
                                                '& .MuiTableSortLabel-icon': {
                                                    color: 'common.white !important', // Ensure icon is white
                                                }
                                            }}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableSortLabel>
                                    )}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row, index) => (
                        <TableRow 
                            key={row.id}
                            sx={{
                                '&:nth-of-type(odd)': {
                                    backgroundColor: (theme) => theme.palette.action.hover, // Alternating row color
                                },
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.action.selected, // Hover effect
                                }
                            }}
                        >
                            {row.getVisibleCells().map(cell => (
                            <TableCell 
                                key={cell.id}
                                sx={{
                                    padding: '12px 16px', // Adjusted padding
                                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                                }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ResultsList;
