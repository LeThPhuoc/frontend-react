import { useEffect, useState } from "react";
import { DataProject, getListProjectApi } from "../../api/project/getListProjectApi";

type Props = {
    rootRef: React.RefObject<HTMLDivElement | null>;
    offset?: number;
    searchTerm?: string
    per_page?: number
};

export const useProjectList = ({
    rootRef,
    offset = 50,
    searchTerm,
    per_page
}: Props) => {
    const [list, setList] = useState<DataProject[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getListProject = async (searchTerm?: string, per_page?: number, page?: number) => {
        setIsLoading(true)
        await getListProjectApi({
            search: searchTerm,
            page: page,
            per_page,
            success(data) {
                setList(data.data)
                setLastPage(data.last_page)
            },
        })
        setIsLoading(false)
    }

    useEffect(() => {
        setLastPage(null)
        setPage(1)
        getListProject(searchTerm, per_page)
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

                await getListProjectApi({
                    search: searchTerm,
                    page: page + 1,
                    per_page,
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
