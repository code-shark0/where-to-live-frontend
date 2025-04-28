import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { City } from "../types/City";

interface ResultsListProps {
    data: Array<City>;
}

// Results list that displays all catalog items filtered by a search
// The data coming in is assumed to be an aggregated superset of all the users saved albums, tracks, and episodes
const ResultsList: FC<ResultsListProps> = ({data}) => {
    const [listData, setListData] = useState<Array<City>>([]);

    // One of the core obvious changes that I could make here in addition to cleaning up the styling would be
    // to add in virtualization with infinite scrolling, or pagination which would be simple enough on the component side with tanstack. 
    // It might also be a good idea depending on the amount of data coming in from the API to limit the amount of data
    // coming in, and dynamically make calls to grab more data as the user scrolls down the page, or when the
    // next page is requested if it was made in a table with pagination.

    useEffect(() => {
        setListData(data.map(item => {return {
            id: item?.id, 
            name: item?.name,
            costOfLivingIndex: item?.costOfLivingIndex,
            crimeIndex: item?.crimeIndex,
            medianIncome: item?.medianIncome,
            walkabilityScore: item?.walkabilityScore,
            averageTemperature: item?.averageTemperature}}));
    }, [data]);

    const columnHelper = createColumnHelper<City>();
    const columns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.renderValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('costOfLivingIndex', {
            header: 'Cost of Living',
            cell: info => info.renderValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('crimeIndex', {
            header: 'Crime',
            cell: info => info.renderValue(),
            enableSorting: true
        }),
        columnHelper.accessor('medianIncome', {
            header: 'Median Income',
            cell: info => info.renderValue(),
            enableSorting: true
        }),
        columnHelper.accessor('walkabilityScore', {
            header: 'Walkability',
            cell: info => info.renderValue(),
            enableSorting: true
        }),
        columnHelper.accessor('averageTemperature', {
            header: 'Average Temperature',
            cell: info => info.renderValue(),
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
