import { action, computed, flow, observable } from 'mobx';
import { getPaginatedMovieList } from '../utils/api-service';

export class TableStore {
    DEFAULT_PARAMS = {
        page: 1,
        limit: 10,
        order: 'asc',
        sort_by: 'title',
    };

    @observable moviesList = [];
    @observable paginatedMoveList = [];
    @observable allMoviesCount = 0;
    @observable selectedMovieData = {
        title: '',
        releaseDate: '',
        imdbRating: null,
        imdbVotes: null,
    };
    @observable filterParams = this.DEFAULT_PARAMS;
    @observable loadedPages = [];

    @observable isLoadingTableData = false;
    @observable isSelectedMovieModalVisible = false;
    @observable isInfiniteListEnabled = false;

    @observable isFirstLoad = true;

    @observable tableError = null;

    @computed get paginatedMovieList () {
        const startIndex = (this.filterParams.page - 1) * this.filterParams.limit;
        const endIndex = this.filterParams.page * this.filterParams.limit;
        console.log(startIndex, endIndex);

        console.log(this.moviesList);
        return this.moviesList.slice(startIndex, endIndex);
    }

    *_getPaginatedMovieList () {
        if (this.loadedPages.includes(this.filterParams.page)) {
            return;
        }

        this.setLoadingTableData(true);

        try {
            const { data } = yield getPaginatedMovieList(this.filterParams);

            if (this.isFirstLoad) {
                this.moviesList = [...Array(data.count)];
                this.isFirstLoad = false;
            }

            this.loadedPages.push(this.filterParams.page);
            this.setAllMoviesCount(data.count);
            this.setMoviesList(data.list);
        } catch (error) {
            this.setTableError(error.data);
        } finally {
            this.setLoadingTableData(false);
        }
    }
    getPaginatedMovieList = flow(this._getPaginatedMovieList);

    @action setMoviesList (data) {
        const startIndex = (this.filterParams.page - 1) * this.filterParams.limit;

        this.moviesList.splice(startIndex, data.length, ...data);
    }

    @action setCurrentFilterParams (filterParams) {
        this.filterParams = { ...this.filterParams, ...filterParams };
    }

    @action changeOrderDirection () {
        this.filterParams.order = this.filterParams.order === 'asc' ? 'desc' : 'asc';
        this.filterParams.page = 1;
        this.resetMovieListAndGetMovies();
    }

    @action changeSortBy (sortBy) {
        this.filterParams.sort_by = sortBy;
        this.filterParams.order = 'asc';
        this.resetMovieListAndGetMovies();
    }

    @action resetMovieListAndGetMovies () {
        this.moviesList = [];
        this.loadedPages = [];
        this.isFirstLoad = true;
        this.getPaginatedMovieList();
    }

    @action setAllMoviesCount (count) {
        this.allMoviesCount = count;
    }

    @action setLoadingTableData (value) {
        this.isLoadingTableData = value;
    }

    @action setSelectedMovieData (data) {
        this.selectedMovieData = data;
    }

    @action setSelectedMovieModalVisible (value) {
        this.isSelectedMovieModalVisible = value;
    }

    @action.bound toggleInfiniteList () {
        // if (!this.isInfiniteListEnabled) {
        //     this.setCurrentFilterParams({ limit: 30, page: 1 });
        // }

        this.isInfiniteListEnabled = !this.isInfiniteListEnabled;
    }

    @action setTableError (error) {
        this.tableError = error;
    }
}
