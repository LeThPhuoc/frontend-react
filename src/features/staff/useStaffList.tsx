import { useEffect, useState } from "react";
import { getListStaffApi, Staff } from "../../api/staff/getListStaffApi";

type Props = {
    rootRef: React.RefObject<HTMLDivElement | null>;
    offset?: number;
    searchTerm?: string
};

export const useStaffList = ({
    rootRef,
    offset = 50,
    searchTerm
}: Props) => {
    const [list, setList] = useState<Staff[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getListStaff = async (searchTerm?: string, page?: number) => {
        await getListStaffApi({
            search: searchTerm,
            page: page,
            success(data) {
                setList(data.data)
                setLastPage(data.last_page)
            },
        })
    }

    useEffect(() => {
        setLastPage(null)
        setPage(1)
        getListStaff(searchTerm)
    }, [searchTerm])

    useEffect(() => {
        const wrap = rootRef.current;
        if (!wrap) return;

        const onScroll = async () => {
            if (!wrap || isLoading) return;

            const bottom =
                wrap.scrollHeight - wrap.scrollTop - wrap.clientHeight;

            if (bottom <= offset && lastPage && page < lastPage) {
                setIsLoading(true);

                await getListStaffApi({
                    search: searchTerm,
                    page: page + 1,
                    success(data) {
                        const newList = [...list, ...data.data].filter((item, index, self) => index === self.findIndex((obj) => obj.id === item.id))
                        setList(newList);
                        setPage(page + 1)
                    },
                });

                setIsLoading(false);
            }
        };

        wrap.addEventListener("scroll", onScroll);
        return () => wrap.removeEventListener("scroll", onScroll);
    }, [page, isLoading, offset, lastPage]);

    return { list, setList, isLoading };
}
