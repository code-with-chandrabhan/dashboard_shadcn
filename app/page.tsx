"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  MoreHorizontal,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  EyeOff,
  ChevronRight,
  AlignJustify,
  CircleFadingPlus,
  ChevronsRight,
  ChevronsLeft,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  ArrowDownToLine,
  ArrowUpToLine,
  ArrowRightToLine,
  CircleArrowUp,
  Circle,
  CircleHelp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const generateRandomTask = (index: number) => {
  const taskTypes = [
    "Bug",
    "Feature",
    "Enhancement",
    "Documentation",
    "Testing",
  ];
  const components = [
    "Authentication",
    "Dashboard",
    "admin",
    "Database",
    "UI",
    "Payment",
    "Search",
    "Navigation",
    "Profile",
    "Settings",
  ];
  const actions = [
    "not working",
    "needs improvement",
    "crashes",
    "is slow",
    "needs refactoring",
    "has memory leak",
    "needs optimization",
  ];
  const environments = [
    "in production",
    "in development ",
    "on mobile devices",
    "in Chrome",
    "in Firefox",
    "on iOS",
    "on Android",
  ];

  const taskType = taskTypes[index % taskTypes.length];
  const component = components[(index * 2) % components.length];
  const action = actions[(index * 3) % actions.length];
  const environment = environments[(index * 4) % environments.length];

  const statuses = ["Done", "in progress", "Blocked", "Todo", "cancelled"];
  const priorities = ["High", "Medium", "Low"];

  return {
    id: `Task-${(index + 1).toString().padStart(4, "0")}`,
    Title: `${taskType}: ${component} ${action} ${environment}`,
    status: statuses[index % statuses.length],
    priority: priorities[index % priorities.length],
  };
};

const data: Payment[] = Array.from({ length: 100 }, (_, index) =>
  generateRandomTask(index)
);

export type Payment = {
  id: string;
  Title: string;
  status: string;
  priority: string;
};

export const columns: ColumnDef<Payment>[] = [
  // checkbox

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Task",
  },
  // title
  {
    accessorKey: "Title",
    header: ({ column }) => {
      const [sort, setSort] = React.useState<"none" | "asc" | "desc">("none");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            {sort === "none" && (
              <>
                Title
                <ChevronsUpDown className="h-4 w-4" />
              </>
            )}
            {sort === "asc" && (
              <>
                Title
                <ArrowUp className="h-4 w-4" />
              </>
            )}
            {sort === "desc" && (
              <>
                Title
                <ArrowDown className="h-4 w-4" />
              </>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(false);
                setSort("asc");
              }}
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              ASC
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(true);
                setSort("desc");
              }}
              className="flex items-center gap-2"
            >
              <ArrowDown className="h-4 w-4" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff className="h-4 w-4" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    accessorFn: (row) => row.Title,

    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("Title")}</div>;
    },
  },
  // status
  {
    accessorKey: "status",
    header: ({ column }) => {
      const [sort, setSort] = React.useState<"none" | "asc" | "desc">("none");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            {sort === "none" && (
              <>
                Status
                <ChevronsUpDown className="h-4 w-4" />
              </>
            )}
            {sort === "asc" && (
              <>
                Status
                <ArrowUp className="h-4 w-4" />
              </>
            )}
            {sort === "desc" && (
              <>
                Status
                <ArrowDown className="h-4 w-4" />
              </>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(false);
                setSort("asc");
              }}
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              ASC
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(true);
                setSort("desc");
              }}
              className="flex items-center gap-2"
            >
              <ArrowDown className="h-4 w-4" />
              Desc
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff className="h-4 w-4" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const icon =
        {
          Done: <CheckCircle2 className="h-4 w-4 text-gray-500" />,
          "in progress": <CircleArrowUp className="h-4 w-4 text-gray-500" />,
          Blocked: <CircleHelp className="h-4 w-4 text-gray-500" />,
          Todo: <Circle className="h-4 w-4 text-gray-500" />,
          cancelled: <XCircle className="h-4 w-4 text-gray-400" />,
        }[status] || null;

      return (
        <div className="flex items-center gap-2">
          {icon}
          <span>{status}</span>
        </div>
      );
    },
  },
  // priority
  {
    accessorKey: "priority",
    header: ({ column }) => {
      const [sort, setSort] = React.useState<"none" | "asc" | "desc">("none");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            {sort === "none" && (
              <>
                Priority
                <ChevronsUpDown className="h-4 w-4" />
              </>
            )}
            {sort === "asc" && (
              <>
                Priority
                <ArrowUp className="h-4 w-4" />
              </>
            )}
            {sort === "desc" && (
              <>
                Priority
                <ArrowDown className="h-4 w-4" />
              </>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(false);
                setSort("asc");
              }}
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              ASC
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(true);
                setSort("desc");
              }}
              className="flex items-center gap-2"
            >
              <ArrowDown className="h-4 w-4" />
              Desc
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff className="h-4 w-4" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      const priorityMap = {
        High: {
          icon: <ArrowUpToLine className="h-4 w-4 text-gray-500" />,
        },
        Medium: {
          icon: <ArrowRightToLine className="h-4 w-4 text-gray-500" />,
        },
        Low: {
          icon: <ArrowDownToLine className="h-4 w-4 text-gray-500" />,
        },
      }[priority] || { icon: null };

      return (
        <div className="flex  w-full">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-2 px-3 py-1 pointer-events-none  ${priorityMap}`}
            >
              {priorityMap.icon}
              <span>{priority}</span>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      );
    },
  },
  // ......
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const priority = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Edit</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(priority.id)}
            >
              Make a copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Labels
              <ChevronRight className="h-4 w-4 ml-8" />
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize: rowsPerPage,
        pageIndex: currentPage - 1,
      },
    },
  });

  React.useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
    table.setPageIndex(0);
  }, [columnFilters, sorting, rowsPerPage]);

  const totalPages = Math.ceil(
    table.getFilteredRowModel().rows.length / rowsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      table.setPageIndex(newPage - 1);
    }
  };

  // const filterByStatus = (status: string) => {
  //   table.getColumn("status")?.setFilterValue(status)
  // }

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">welcome Back!</h2>
          <p>Here's a list of your tasks for this month</p>
        </div>
        <div>
          <img
            src="https://ui.shadcn.com/avatars/03.png"
            alt="..."
            className="w-10 h-10"
          ></img>
        </div>
      </div>
      <div className="flex items-center py-4 mt-4 ">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("Title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Title")?.setFilterValue(event.target.value)
          }
          className="w-80 border-2 "
        />

        <div className="flex items-center gap-4 ml-6">
          {/* button... */} 
           <button className="flex items-center gap-2 border-2 border-dashed border-gray-400 py-1 px-2 rounded-md text-gray-500">
            <CircleFadingPlus className="h-4 w-4" />
            status
          </button>

          <button className="flex items-center gap-2 border-2 border-dashed border-gray-400 py-1 px-2 rounded-md text-gray-500">
            <CircleFadingPlus className="h-4 w-4" />
            priority
          </button>
        </div>

      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <AlignJustify />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <p>Rows per page</p>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-2">
              {rowsPerPage}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <DropdownMenuItem
                  key={pageSize}
                  onClick={() => {
                    setRowsPerPage(pageSize);
                    table.setPageSize(pageSize);
                    handlePageChange(1);
                  }}
                >
                  {pageSize}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Pagination>
            <PaginationContent>
              <PaginationItem className="mr-4">
                Page {currentPage} of {totalPages}
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default DataTableDemo;
