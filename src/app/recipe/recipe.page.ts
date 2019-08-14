import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Strings} from '../strings';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.page.html',
    styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

    public FOOTER = Strings.FOOTER;

    public data: any;
    public listOfIngredients: any = [];
    public listOfRecipes: any = [];
    public listOfGifs: any = [];

    public ionTitle: string;
    public ionImg: string;
    public categoryTitle: string;
    public listOfIngredientsTitle: string;
    public recipeTitle: string;
    public tutorialTitle: string;
    public difficulty: string;

    public targetRecipe: string;


    constructor(private http: HttpClient, private activatedRouter: ActivatedRoute) {

    }

    ngOnInit(): void {

        this.activatedRouter.params.subscribe(params => {
            switch (params.type) {
                case 'menemen':
                    this.targetRecipe = 'assets/recipes/menemen.json';
                    break;
                case 'manti':
                    this.targetRecipe = 'assets/recipes/manti.json';
                    break;
                case 'laztatlisi':
                    this.targetRecipe = 'assets/recipes/laztatlisi.json';
                    break;
                default:
                    break;
            }
        });

        this.http.get(this.targetRecipe, {responseType: 'json'}).subscribe(
            response => {
                this.data = response;
                for (const key in this.data.list_of_ingredients) {
                    if (this.data.list_of_ingredients.hasOwnProperty(key)) {
                        this.listOfIngredients.push(this.data.list_of_ingredients[key]);
                    }
                }
                for (const key in this.data.recipe) {
                    if (this.data.recipe.hasOwnProperty(key)) {
                        this.listOfRecipes.push(this.data.recipe[key]);
                    }
                }
                for (const key in this.data.gifs) {
                    if (this.data.gifs.hasOwnProperty(key)) {
                        this.listOfGifs.push(this.data.gifs[key]);
                    }
                }
                this.ionTitle = JSON.stringify(this.data.ion_title).split('"').join('');
                this.ionImg = JSON.stringify(this.data.ion_img).split('"').join('');
                this.categoryTitle = JSON.stringify(this.data.category_title).split('"').join('');
                this.listOfIngredientsTitle = JSON.stringify(this.data.list_of_ingredients_title).split('"').join('');
                this.tutorialTitle = JSON.stringify(this.data.tutorial_title).split('"').join('');
                this.recipeTitle = JSON.stringify(this.data.recipe_title).split('"').join('');
                this.difficulty = JSON.stringify(this.data.difficulty).split('"').join('');
            });

    }


}
